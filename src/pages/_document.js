// pages/_document.js
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="icon" href="/favicon.ico" />
                    {/* Any other head elements you want to include */}
                    {/* Include jQuery */}
                    <script src="https://code.jquery.com/jquery-3.6.0.min.js" integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5/6K4YT6k1FFbZtL2B8qh2/3IT4DqFh3OQb2zH8A0B" crossOrigin="anonymous"></script>
                    {/* Include FlipBook JavaScript and CSS */}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/3d-flipbook@latest/flipbook.min.css" />
                    <script src="https://cdn.jsdelivr.net/npm/3d-flipbook@latest/flipbook.min.js" integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5/6K4YT6k1FFbZtL2B8qh2/3IT4DqFh3OQb2zH8A0B" crossOrigin="anonymous"></script>

                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
