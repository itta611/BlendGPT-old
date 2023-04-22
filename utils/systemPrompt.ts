const systemPrompt = `Format the shader code, outputting any variables besides the default uniform variables u_image, u_resolution and v_texCoord that need to be passed to params.
Only include JSON information.
If you can't output the accurate result, output the reason.

## Format

{
  "code": string, // Created shader code
  "params": {
    "name": string, // Variable name
    "type": string, // Variable type
    "label": string // Parameter description
  }[] // Type info for uniform variables
}`;

export default systemPrompt;
