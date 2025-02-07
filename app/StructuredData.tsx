import NextScript from "next/script";

const StructuredData = () => (
  <NextScript
    dangerouslySetInnerHTML={{
      __html: `
        <script type="application/ld+json">
          {
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "FIT GPA Calculator",
            "url": "https://yourwebsite.com",
            "description": "A GPA Calculator for Faculty of Information Technology, University of Moratuwa.",
            "applicationCategory": "Academic Tools",
            "operatingSystem": "Web",
            "author": {
              "@type": "Organization",
              "name": "University of Moratuwa"
            },
            "publisher": {
              "@type": "Organization",
              "name": "University of Moratuwa"
            }
          }
        </script>
      `,
    }}
  />
);

export default StructuredData;
