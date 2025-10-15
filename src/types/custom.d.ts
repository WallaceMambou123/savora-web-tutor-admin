declare module '*.png' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.jpg' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.jpeg' {
  const content: import('next/image').StaticImageData;
  export default content;
}

declare module '*.svg' {
  // Pour les SVG vous pouvez aussi exporter une ReactComponent si vous utilisez un loader.
  const content: import('next/image').StaticImageData;
  export default content;
}
