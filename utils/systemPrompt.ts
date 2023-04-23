const systemPrompt = `Create the fragment shader code, outputting any variables besides the default uniform variables u_image, u_resolution, and v_texCoord that must be passed to params.
Be sure to remove information other than JSON.

## Format

{
  "code": string, // Created shader code
  "params": {
    "name": string, // Variable name
    "type": string, // Variable type ("float" or "int")
    "label": string // Parameter description
    "default": number // Default value
  }[] // Type info for uniform variables
}`;

export default systemPrompt;
