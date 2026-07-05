'use client';

import React from 'react';
import Image from 'next/image';
import { BlogCard } from './BlogsPage';
import { BlogPost, BLOG_POSTS } from '@/lib/blogData';

const CYAN = '#00D9FF';
const BG_SECTION = '#292F36';

interface ArticlePageProps {
  post: BlogPost;
}

function ArticleMetaRow({ author, date, readTime }: { author: string; date: string; readTime: string }) {
  return (
    <div className="flex flex-wrap items-center justify-between w-full max-w-[800px] mx-auto py-4 font-primary text-[13px] text-[#E2E8F0]">
      <div className="flex items-center gap-4">
        <span><strong className="text-white font-bold">Author</strong> {author}</span>
        <span><strong className="text-white font-bold">Date</strong> {date}</span>
        <span><strong className="text-white font-bold">Read</strong> {readTime}</span>
      </div>
      <button className="flex items-center justify-center w-8 h-8 rounded-full border border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3"></circle>
          <circle cx="6" cy="12" r="3"></circle>
          <circle cx="18" cy="19" r="3"></circle>
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
          <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
        </svg>
      </button>
    </div>
  );
}

export function ArticlePage({ post }: ArticlePageProps) {
  return (
    <section
      style={{
        backgroundColor: BG_SECTION,
        minHeight: '100vh',
        paddingBottom: '48px',
      }}
      className="pt-24 px-6 flex flex-col items-center"
    >
      {/* Title */}
      <h1 className="font-primary text-center text-3xl md:text-[32px] text-[#00D9FF] font-normal leading-snug max-w-[800px] mx-auto mb-6">
        {post.title}
      </h1>

      {/* Top Meta */}
      <ArticleMetaRow author={post.author} date={post.date} readTime={post.readTime} />

      {/* Hero Image */}
      <div className="w-full max-w-[800px] aspect-[16/9] md:aspect-[2/1] relative mt-4 mb-10 rounded overflow-hidden">
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          className="object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="w-full max-w-[800px] font-primary text-[15px] text-[#E2E8F0] leading-[1.8] flex flex-col gap-6">
        <p>
          Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet. It involves writing code and markup logic, to build front-end web development, to build back-end infrastructure, and database management logic. Because of these, web developers use programming languages to construct websites.
        </p>

        <h3 className="text-[#00D9FF] text-[16px] font-normal mt-4">Front-end development</h3>
        <p>
          Front-end development is responsible for the visual aspects of a website – whatever a user interacts with. Its focus is to design elements that users interact with directly, to ensure a site displays correctly, and works adequately on all devices, and across operating systems. Due to the rapid, dynamic and expansive nature of the internet, they need to have extensive knowledge, constantly staying updated with the rapid advancement of the web space to ensure that users have an optimal, seamless and easy user interface.
        </p>

        <h3 className="text-[#00D9FF] text-[16px] font-normal mt-4">Back-end development</h3>
        <p>
          Back-end development, on the other hand, deals with the core functions and features of a website running under the hood (the database and the server that connects to it, the unseen structure that makes the website work smoothly). Since it handles the data necessary for the internet, and servers, web applications, apps, and more, as well as features such as accounts, passwords and security, it ensures everything works effectively without experiencing outages, or the database can crash the website.
        </p>

        <h3 className="text-[#00D9FF] text-[16px] font-normal mt-4">Maintaining website and software</h3>
        <p>
          Maintaining is one of the key tasks of software development. Due to the shift dynamics in code, libraries and tools will need to reflect real, up to date scenarios. Web developers deal with continuous issues, and testing for software quality. This is generally possible via automated software development process - in which coding, building, testing, and deployment processes are mostly done automatically, allowing developers and system engineers to continuously test software without relying on manual and redundant operations.
        </p>

        <h3 className="text-[#00D9FF] text-[16px] font-normal mt-4">Career</h3>
        <p>
          Mastering a broad aspect of web development (the focus on back-end server, algorithms and databases, and front-end interface (UI/UX design)) takes time and a well-rounded mind to build a website. You work closely with project teams and software engineers, as well as clients, system engineers, and other web developers to ensure that the user requirements are achieved and met explicitly in the requested development application or website.
        </p>
        <p>
          More than that, at the stage of the internet, the relevance of web developers is ever present. Almost all modern businesses must rely on a well-designed website or application as an important tool to interface and to connect effectively with a broader base, to push their business reach and service to the world at large. To build an optimal and effective site, websites that meet the needs of modern users.
        </p>
      </div>

      {/* Tags */}
      <div className="w-full max-w-[800px] flex flex-wrap gap-4 mt-12 mb-8 font-primary">
        <span className="bg-[#424952] text-[#E2E8F0] px-4 py-1.5 rounded-full text-[12px]">Web Developer</span>
        <span className="bg-[#424952] text-[#E2E8F0] px-4 py-1.5 rounded-full text-[12px]">Web Designer</span>
        <span className="bg-[#424952] text-[#E2E8F0] px-4 py-1.5 rounded-full text-[12px]">Web Management</span>
      </div>

      {/* Bottom Meta */}
      <ArticleMetaRow author={post.author} date={post.date} readTime={post.readTime} />

      {/* Subscribe Button */}
      <div className="w-full max-w-[800px] flex justify-center mt-12 mb-20">
        <button className="border-2 border-[#00D9FF] text-white bg-transparent font-monospace text-[14px] px-8 py-2.5 rounded-full cursor-pointer transition-colors hover:bg-[#00D9FF]/10 tracking-wide">
          Subscribe My Blogs
        </button>
      </div>

      {/* You Might Also Like Section */}
      <div className="w-full max-w-[800px] flex flex-col items-center mt-8">
        <h2 className="text-[#00D9FF] font-primary text-3xl md:text-[32px] mb-12 text-center">
          You Might Also Like
        </h2>
        <div className="w-full flex flex-col">
          {BLOG_POSTS.slice(0, 5).map((relatedPost, idx) => (
            <React.Fragment key={relatedPost.id}>
              {idx > 0 && <hr className="w-full border-t border-white/20 my-0" />}
              <BlogCard post={relatedPost} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArticlePage;
