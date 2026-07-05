export interface BlogPost {
  id: number;
  image: string;
  imageAlt: string;
  title: string;
  excerpt: string;
  tag: string;
  author: string;
  date: string;
  readTime: string;
  showReadMore?: boolean;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 2,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 3,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 4,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
  {
    id: 5,
    image: '/Blog.jpg',
    imageAlt: 'Web developer at laptop',
    title: 'What does it take to become a web developer?',
    excerpt:
      'Web development, also known as website development, encompasses a variety of tasks and processes involved in creating websites for the internet...',
    tag: 'Web Developer',
    author: 'Caleb',
    date: '12.Jun 2026',
    readTime: '1 Min',
    showReadMore: true,
  },
];
