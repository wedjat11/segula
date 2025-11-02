// Google Apps Script para formularios Segula (Aplicaciones y Contacto)
// CONFIGURA TU SHEET_ID AQUÍ:
const SHEET_ID = '1FwTZfL2qUsrQ7dLQpZOVtR2XN6w2YKBb6ZyS-nKyRCU';
const SHEET_NAME_APLICACIONES = 'Aplicaciones';
const SHEET_NAME_CONTACTOS = 'Contactos';

// CONFIGURA EL EMAIL PARA RECIBIR NOTIFICACIONES:
const EMAIL_NOTIFICACION = 'jesusalfonsomontiel@gmail.com';

/**
 * Función principal para recibir datos del formulario
 */
function doPost(e) {
  try {
    console.log('📥 Formulario recibido');

    // Obtener datos del formulario
    const data = JSON.parse(e.postData.contents);
    console.log('📋 Datos:', data);
    console.log('📝 Tipo de formulario:', data.formType);

    // Determinar qué tipo de formulario es
    if (data.formType === 'contact') {
      return procesarFormularioContacto(data);
    } else if (data.formType === 'job_application') {
      return procesarFormularioAplicacion(data);
    } else {
      console.error('❌ Tipo de formulario desconocido:', data.formType);
      return ContentService
        .createTextOutput('ERROR: Tipo de formulario desconocido')
        .setMimeType(ContentService.MimeType.TEXT);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    return ContentService
      .createTextOutput('ERROR')
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * Procesar formulario de contacto
 */
function procesarFormularioContacto(data) {
  try {
    console.log('📞 Procesando formulario de contacto');

    // Obtener/crear la hoja de contactos
    const sheet = getOrCreateSheet(SHEET_NAME_CONTACTOS, 'contacto');

    // Preparar fila de datos
    const fila = [
      new Date(), // Fecha actual
      data.nombre || '',
      data.apellido || '',
      data.email || '',
      data.telefono || '',
      data.compania || '',
      data.mensaje || '',
      data.language || 'es'
    ];

    // Insertar en la hoja
    sheet.appendRow(fila);
    console.log('✅ Datos de contacto guardados en la hoja');

    // Enviar notificación por email
    try {
      enviarNotificacionContacto(data);
      console.log('✅ Email de contacto enviado');
    } catch (emailError) {
      console.error('⚠️ Error enviando email (continuando):', emailError);
    }

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    console.error('❌ Error procesando contacto:', error);
    throw error;
  }
}

/**
 * Procesar formulario de aplicación de trabajo
 */
function procesarFormularioAplicacion(data) {
  try {
    console.log('💼 Procesando formulario de aplicación');

    // Obtener/crear la hoja de aplicaciones
    const sheet = getOrCreateSheet(SHEET_NAME_APLICACIONES, 'aplicacion');

    // Guardar archivo en Drive si existe
    let archivoUrl = '';
    if (data.curriculum && data.fileName) {
      archivoUrl = guardarArchivo(data.curriculum, data.fileName, data.email);
    }

    // Preparar fila de datos
    const fila = [
      new Date(), // Fecha actual
      data.nombre || '',
      data.apellido || '',
      data.email || '',
      data.telefono || '',
      data.sector || '',
      data.fileName || '',
      archivoUrl,
      data.language || 'es'
    ];

    // Insertar en la hoja
    sheet.appendRow(fila);
    console.log('✅ Datos de aplicación guardados en la hoja');

    // Enviar notificación por email
    try {
      enviarNotificacionAplicacion(data, archivoUrl);
      console.log('✅ Email de aplicación enviado');
    } catch (emailError) {
      console.error('⚠️ Error enviando email (continuando):', emailError);
    }

    return ContentService
      .createTextOutput('OK')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (error) {
    console.error('❌ Error procesando aplicación:', error);
    throw error;
  }
}

/**
 * Enviar notificación de contacto por email
 */
function enviarNotificacionContacto(data) {
  // No enviar si no se configuró el email
  if (!EMAIL_NOTIFICACION || EMAIL_NOTIFICACION === 'tu-email@empresa.com') {
    console.log('⚠️ Email de notificación no configurado');
    return;
  }

  // Crear el contenido del email
  const asunto = `📞 Nuevo Contacto: ${data.nombre} ${data.apellido}`;

  const contenido = `
<h2>📞 Nuevo Mensaje de Contacto</h2>
<hr>

<h3>👤 Información del Contacto:</h3>
<ul>
  <li><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</li>
  <li><strong>Email:</strong> ${data.email}</li>
  <li><strong>Teléfono:</strong> ${data.telefono || 'No proporcionado'}</li>
  <li><strong>Compañía:</strong> ${data.compania || 'No especificada'}</li>
  <li><strong>Idioma:</strong> ${data.language === 'en' ? 'Inglés' : data.language === 'fr' ? 'Francés' : 'Español'}</li>
</ul>

<h3>💬 Mensaje:</h3>
<div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid #4285f4; margin: 15px 0;">
  <p style="white-space: pre-wrap;">${data.mensaje || 'Sin mensaje'}</p>
</div>

<hr>
<h3>📊 Acciones:</h3>
<p><a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${getSheetId(SHEET_NAME_CONTACTOS)}" target="_blank">📈 Ver todos los contactos en Google Sheets</a></p>

<br>
<p><small>📅 Fecha: ${new Date().toLocaleString('es-ES')}</small></p>
  `;

  // Enviar el email
  MailApp.sendEmail({
    to: EMAIL_NOTIFICACION,
    subject: asunto,
    htmlBody: contenido
  });

  console.log(`📧 Email de contacto enviado a: ${EMAIL_NOTIFICACION}`);
}

/**
 * Enviar notificación de aplicación por email
 */
function enviarNotificacionAplicacion(data, archivoUrl) {
  // No enviar si no se configuró el email
  if (!EMAIL_NOTIFICACION || EMAIL_NOTIFICACION === 'tu-email@empresa.com') {
    console.log('⚠️ Email de notificación no configurado');
    return;
  }

  // Crear el contenido del email
  const asunto = `💼 Nueva Aplicación: ${data.nombre} ${data.apellido}`;

  const contenido = `
<h2>🎯 Nueva Aplicación Recibida</h2>
<hr>

<h3>📋 Información del Candidato:</h3>
<ul>
  <li><strong>Nombre:</strong> ${data.nombre} ${data.apellido}</li>
  <li><strong>Email:</strong> ${data.email}</li>
  <li><strong>Teléfono:</strong> ${data.telefono || 'No proporcionado'}</li>
  <li><strong>Sector:</strong> ${data.sector || 'No especificado'}</li>
  <li><strong>Idioma:</strong> ${data.language === 'en' ? 'Inglés' : data.language === 'fr' ? 'Francés' : 'Español'}</li>
</ul>

<h3>📎 Archivo:</h3>
${data.fileName ?
  `<p><strong>Archivo:</strong> ${data.fileName}</p>
   ${archivoUrl && archivoUrl !== 'Error al guardar' ?
     `<p><a href="${archivoUrl}" target="_blank" style="background-color: #4285f4; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">📄 Ver CV en Drive</a></p>` :
     '<p>⚠️ Error al guardar el archivo</p>'
   }`
  : '<p>No se adjuntó archivo</p>'
}

<hr>
<h3>📊 Acciones:</h3>
<p><a href="https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${getSheetId(SHEET_NAME_APLICACIONES)}" target="_blank">📈 Ver todas las aplicaciones en Google Sheets</a></p>

<br>
<p><small>📅 Fecha: ${new Date().toLocaleString('es-ES')}</small></p>
  `;

  // Enviar el email
  MailApp.sendEmail({
    to: EMAIL_NOTIFICACION,
    subject: asunto,
    htmlBody: contenido
  });

  console.log(`📧 Email de aplicación enviado a: ${EMAIL_NOTIFICACION}`);
}

/**
 * Obtener o crear la hoja según el tipo
 */
function getOrCreateSheet(sheetName, tipo) {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);

    // Encabezados según el tipo
    let headers;
    if (tipo === 'contacto') {
      headers = [
        'Fecha',
        'Nombre',
        'Apellido',
        'Email',
        'Teléfono',
        'Compañía',
        'Mensaje',
        'Idioma'
      ];
    } else { // aplicacion
      headers = [
        'Fecha',
        'Nombre',
        'Apellido',
        'Email',
        'Teléfono',
        'Sector',
        'Archivo',
        'Enlace',
        'Idioma'
      ];
    }

    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Formato
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground(tipo === 'contacto' ? '#34a853' : '#4285f4');
    headerRange.setFontColor('white');

    // Ajustar ancho de columnas
    for (let i = 1; i <= headers.length; i++) {
      sheet.setColumnWidth(i, 150);
    }

    // Columna de mensaje o enlace más ancha
    if (tipo === 'contacto') {
      sheet.setColumnWidth(7, 300); // Mensaje
    } else {
      sheet.setColumnWidth(8, 300); // Enlace
    }
  }

  return sheet;
}

/**
 * Obtener el ID de la hoja (gid) para el enlace
 */
function getSheetId(sheetName) {
  try {
    const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
    const sheet = spreadsheet.getSheetByName(sheetName);
    return sheet ? sheet.getSheetId() : 0;
  } catch (error) {
    console.error('Error obteniendo ID de hoja:', error);
    return 0;
  }
}

/**
 * Guardar archivo en Drive
 */
function guardarArchivo(base64Data, fileName, email) {
  try {
    // Crear carpeta si no existe
    let folder;
    const folders = DriveApp.getFoldersByName('Curriculums_Segula');
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder('Curriculums_Segula');
    }

    // Convertir base64 a archivo
    const base64Content = base64Data.split(',')[1];
    const blob = Utilities.newBlob(
      Utilities.base64Decode(base64Content),
      getMimeType(fileName),
      `${new Date().getTime()}_${email.replace(/[^a-zA-Z0-9]/g, '_')}_${fileName}`
    );

    // Guardar archivo
    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();
  } catch (error) {
    console.error('Error guardando archivo:', error);
    return 'Error al guardar';
  }
}

/**
 * Obtener tipo MIME del archivo
 */
function getMimeType(fileName) {
  const extension = fileName.split('.').pop().toLowerCase();

  const tipos = {
    'pdf': 'application/pdf',
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain'
  };

  return tipos[extension] || 'application/octet-stream';
}

/**
 * Función de prueba
 */
function testScript() {
  try {
    console.log('🧪 Probando configuración...');

    // Probar acceso a las hojas
    const sheetAplicaciones = getOrCreateSheet(SHEET_NAME_APLICACIONES, 'aplicacion');
    console.log('✅ Hoja de Aplicaciones accesible:', sheetAplicaciones.getName());

    const sheetContactos = getOrCreateSheet(SHEET_NAME_CONTACTOS, 'contacto');
    console.log('✅ Hoja de Contactos accesible:', sheetContactos.getName());

    // Probar configuración de email
    if (EMAIL_NOTIFICACION && EMAIL_NOTIFICACION !== 'tu-email@empresa.com') {
      console.log('✅ Email configurado:', EMAIL_NOTIFICACION);
    } else {
      console.log('⚠️ Email NO configurado - Las notificaciones no se enviarán');
    }

    console.log('✅ Todas las pruebas pasaron correctamente');
    return 'Todo bien! Ambas hojas creadas.';
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

/**
 * Función para probar el envío de email de contacto
 */
function probarEmailContacto() {
  if (!EMAIL_NOTIFICACION || EMAIL_NOTIFICACION === 'tu-email@empresa.com') {
    throw new Error('Primero configura EMAIL_NOTIFICACION en la línea 8');
  }

  // Datos de prueba
  const datosTest = {
    nombre: 'María',
    apellido: 'González',
    email: 'maria.test@example.com',
    telefono: '+52 55 1234 5678',
    compania: 'Empresa Test SA',
    mensaje: 'Este es un mensaje de prueba para verificar el formulario de contacto.',
    language: 'es',
    formType: 'contact'
  };

  try {
    enviarNotificacionContacto(datosTest);
    console.log('✅ Email de contacto de prueba enviado correctamente');
    return 'Email de contacto enviado!';
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
}

/**
 * Función para probar el envío de email de aplicación
 */
function probarEmailAplicacion() {
  if (!EMAIL_NOTIFICACION || EMAIL_NOTIFICACION === 'tu-email@empresa.com') {
    throw new Error('Primero configura EMAIL_NOTIFICACION en la línea 8');
  }

  // Datos de prueba
  const datosTest = {
    nombre: 'Juan',
    apellido: 'Pérez',
    email: 'juan.test@example.com',
    telefono: '+52 55 1234 5678',
    sector: 'Tecnología',
    fileName: 'cv-juan-perez.pdf',
    language: 'es',
    formType: 'job_application'
  };

  try {
    enviarNotificacionAplicacion(datosTest, 'https://drive.google.com/file/d/ejemplo');
    console.log('✅ Email de aplicación de prueba enviado correctamente');
    return 'Email de aplicación enviado!';
  } catch (error) {
    console.error('❌ Error enviando email:', error);
    throw error;
  }
}
