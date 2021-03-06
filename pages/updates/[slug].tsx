import { GetStaticProps } from "next";
// import dynamic from "next/dynamic";
import Link from "next/link";
import hydrate from "next-mdx-remote/hydrate";
import renderToString from "next-mdx-remote/render-to-string";
import { MdxRemote } from "next-mdx-remote/types";
import { UpdateData } from "../../types";
import Head from "next/head";
import Layout from "../../components/Layout";
import { A, Image } from "../../components/content";
import useUpdates from "../../hooks/useUpdates";

// Custom components/renderers to pass to MDX.
// Since the MDX files aren't loaded by webpack, they have no knowledge of how
// to handle import statements. Instead, you must include components in scope
// here.
const components: MdxRemote.Components = {
  // It also works with dynamically-imported components, which is especially
  // useful for conditionally loading components for certain routes.
  // See the notes in README.md for more details.
  a: A,
  img: Image,
  //TestComponent: dynamic(() => import("../../components/TestComponent")),
  Head,
};

interface PostPageProps {
  source: MdxRemote.Source;
  frontMatter: UpdateData;
}

export default function PostPage({ source, frontMatter }: PostPageProps) {
  const content = hydrate(source, { components });
  return (
    <Layout>
      <header className="mb-8">
        <nav>
          <Link href="/">
            <a>&#8592; Go back home</a>
          </Link>
        </nav>
      </header>
      <div>
        <h1 className="text-3xl font-semibold">{frontMatter.title}</h1>
        {frontMatter.publishedAt && (
          <p className="text-gray-400 mb-4">{frontMatter.publishedAt}</p>
        )}
      </div>
      <main className="mdx-content">{content}</main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { getUpdateContents } = useUpdates();
  const { content, frontmatter } = getUpdateContents(params && params.slug);
  const mdxSource = await renderToString(content!, {
    components,
    scope: frontmatter,
  });
  return {
    props: {
      source: mdxSource,
      frontMatter: frontmatter,
    },
  };
};

export const getStaticPaths = async () => {
  const { updateFileSlugs } = useUpdates();
  return {
    paths: updateFileSlugs,
    fallback: false,
  };
};
