import * as React from "react";
import Head from "next/head";

type Props = {
  title?: string;
};
const URL = "https://hindsight.supply";
const DESC = "More of a kitchen than a showroom";
const TITLE = "Hindsight Supply";

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = TITLE,
}) => (
  <div className="container mx-auto p-4 md:px-8 lg:px-16 max-w-4xl">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={DESC} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@mhrescak" />
      <meta name="twitter:image" content="/meta/og-image.png" />
      <meta name="twitter:description" content={DESC} />
      <meta name="og:url" content={URL} />
      <meta name="og:title" content={TITLE} />
      <meta name="og:description" content={DESC} />
      <meta name="og:image" content="/meta/og-image.png" />
      <meta name="og:image:alt" content={DESC} />
      <meta name="og:locale" content="en_US" />
      <meta name="og:site_name" content={TITLE} />
      <link rel="icon" href="/meta/icon.png" />
    </Head>
    {children}
  </div>
);

export default Layout;
