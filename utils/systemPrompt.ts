const systemPrompt = `Format the shader code, outputting any variables besides the default uniform variables u_image and v_texCoord that need to be passed to params.
Only include JSON information.

## Format
{
  code: string (created shader code)
  params: {
    name: string (variable name)
    type: string (variable type)
    label: string (parameter description)
  } (type info for uniform variables)
}`;

export default systemPrompt;
