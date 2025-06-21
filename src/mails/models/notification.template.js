

module.exports = {
    notificationTemplate: (asunto, contenido, link) => `
  <body style="text-align: center; margin: 0; padding-top: 10px; padding-bottom: 10px; padding-left: 0; padding-right: 0; -webkit-text-size-adjust: 100%;background-color: #f2f4f6; color: #000000" align="center" align="center">
  
  <div style="text-align: center;">
  
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #287F66;" width="600">
      <tbody>
        <tr>
          <td style=" width: 596px; vertical-align: top; padding-left: 10px; padding-right: 10px; padding-top: 15px; padding-bottom: 15px;" width="596">
  
            <img src="https://bv-ecom-be.onrender.com/images/assets/logo-light-big.png" alt="Logo" title="Logo" style="display:block; margin:auto; width: 150px; max-width: 150px; height: 45px; max-height: 45px; text-align: center; color: #ffffff;" />
          </td>
        </tr>
      </tbody>
    </table>
  
  
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #ffffff;" width="600">
      <tbody>
        <tr>
          <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 40px;" width="596">
  
            <h1 style="font-size: 20px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 600; text-decoration: none; color: #000000;">
            ${asunto}
            </h1>
  
            <p style="font-size: 15px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #919293;">
              ${contenido}
            </p>
  
          </td>
        </tr>
      </tbody>
    </table>
  
  
  
    <table align="center" style="text-align: center; vertical-align: top; width: 600px; max-width: 600px; background-color: #287F66;" width="600">
      <tbody>
        <tr>
          <td style="width: 596px; vertical-align: top; padding-left: 30px; padding-right: 30px; padding-top: 30px; padding-bottom: 30px;" width="596">
  
            <p style="font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #1f2831;">
            <h1 style="font-size: 30px; color:#ffffff"></h1>
            </p>
  
            <p style="margin-bottom: 0; font-size: 13px; line-height: 24px; font-family: 'Helvetica', Arial, sans-serif; font-weight: 400; text-decoration: none; color: #1f2831;">
              <a target="_blank" style="text-decoration: underline; color: #ffffff;" href="https://bv-ecom-fe.vercel.app/">
              .com.ar
              </a>
            </p>
  
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  
  </body>`
  }
  
  
  