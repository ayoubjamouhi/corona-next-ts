import React, { ReactNode } from 'react';
import Head from 'next/head';

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({
  children,
  title = 'Corona virus statistics',
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    {children}
    <footer>
      <hr />
      <div className="text-center text-grey-300">
        Build with next.js By @ayoubjamouhi
      </div>
    </footer>
  </div>
);

export default Layout;
