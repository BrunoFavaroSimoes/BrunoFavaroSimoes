import type { NextConfig } from "next";

// Exporta HTML estático em out/ para publicar em qualquer hospedagem.
const config: NextConfig = { output: "export", images: { unoptimized: true } };
export default config;
