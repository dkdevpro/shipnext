import { notFound } from "next/navigation"
import { getPage, getPages } from '@/app/source';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { MDXContent } from '@content-collections/mdx/react';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import "@/styles/mdx.css"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"


import { env } from "@/env"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react";

interface PostPageProps {
  params: {
    slug: string[]
  }
}

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slugs,
  }));
}

export function generateMetadata({ params }: { params: { slug?: string[] } }) {
  const page = getPage(params.slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  } satisfies Metadata;
}

// export async function generateMetadata(
//   {params} :{params  : {slug : String[]}},
// ): Promise<Metadata> {
//   const post = await getPostFromParams(params)

//   if (!post) {
//     return {}
//   }

//   const url = env.NEXT_PUBLIC_APP_URL

//   const ogUrl = new URL(`${url}/api/og`)
//   ogUrl.searchParams.set("heading", post.title)
//   ogUrl.searchParams.set("type", "Blog Post")
//   ogUrl.searchParams.set("mode", "dark")

//   return {
//     title: post.title,
//     description: post.description,
//     // authors: post.authors.map((author) => ({
//     //   name: author,
//     // })),
//     openGraph: {
//       title: post.title,
//       description: post.description,
//       type: "article",
//       url: absoluteUrl(post.slug),
//       images: [
//         {
//           url: ogUrl.toString(),
//           width: 1200,
//           height: 630,
//           alt: post.title,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.description,
//       images: [ogUrl.toString()],
//     },
//   }
// }

// export async function generateStaticParams(): Promise<
//   PostPageProps["params"][]
// > {
//   return allPosts.map((post) => ({
//     slug: post.slugAsParams.split("/"),
//   }))
// }

export default async function Page({
  params,
}: {
  params: { slug?: string[] };
}) {
  const post = getPage(params.slug);

  if (!post) {
    notFound()
  }

//   const authors = post.authors.map((author) =>
//     allAuthors.find(({ slug }) => slug === `/authors/${author}`)
//   )

// return (
//   <DocsPage toc={post.data.toc} full={post.data.full}>
//     <DocsBody>
//       <h1>{post.data.title}</h1>
//       <MDXContent
//         code={post.data.body}
//         components={{ ...defaultMdxComponents }}
//       />
//     </DocsBody>
//   </DocsPage>
// );
  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            Published on {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {/* {authors?.length ? (
          <div className="mt-4 flex space-x-4">
            {authors.map((author) =>
              author ? (
                <Link
                  key={author._id}
                  href={`https://twitter.com/${author.twitter}`}
                  className="flex items-center space-x-2 text-sm"
                >
                  <Image
                    src={author.avatar}
                    alt={author.title}
                    width={42}
                    height={42}
                    className="rounded-full bg-white"
                  />
                  <div className="flex-1 text-left leading-tight">
                    <p className="font-medium">{author.title}</p>
                    <p className="text-[12px] text-muted-foreground">
                      @{author.twitter}
                    </p>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        ) : null} */}
      </div>
      {/* {post.image && (
        <Image
          src={post.image}
          alt={post.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )} */}
   <MDXContent
        code={post.data.body}
      />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }))}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
    </article>
  )
}