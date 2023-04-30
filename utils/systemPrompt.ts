const systemPrompt = `Create the fragment shader code, outputting any variables besides the default uniform variables u_image, u_resolution, and v_texCoord that must be passed to params.
Be sure to remove information other than JSON.

## Format

{
  "code": string, // Created shader code
  "params": Array[{
    "name": string, // Variable name
    "label": string, // Parameter description (under 18 characters)
    "value": number, // Default value
    "min": number,
    "max": number,
    "step": number
  }] // Type info for uniform variables
}`;

export default systemPrompt;
