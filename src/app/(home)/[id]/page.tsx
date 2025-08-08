'use client';

import { getAllBlogData } from '@/app/(home)/_actions/action';
import { BlogPost } from '@/lib/blogs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RiLoader4Fill } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SinglePostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBlogData();
        const found = res.find((p: BlogPost) => p.slug === params.id);
        setPost(found || null);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  console.log('Single Post:', post);

  if (!post) {
    return <div className="p-8 w-full flex justify-center items-center text-gray-500 text-center">
      <RiLoader4Fill className="animate-spin text-2xl text-orange-500" />
    </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-orange-500 oswald">{post.title}</h1>

      <div className="flex items-center gap-4 font-sans">
        <div className="h-14 w-14 rounded-full overflow-hidden">
          <Image
            src={post.author.image}
            alt={post.author.name}
            width={46}
            height={46}
            className="object-cover h-full w-full"
          />
        </div>
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>

      <Image src={post.imageUrl} alt={post.title} height={500} width={900} className=" rounded" />

      <p className="text-gray-700 dm_sans">{post.description}</p>

      <article className="prose max-w-none mt-4 dm_sans">
  <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {post.markdownContent}
      </ReactMarkdown>
      </article>

      <div className="text-sm flex justify-start items-start flex-col gap-4 text-gray-500">
        <p className='dm_sans'><strong className='oswald text-xl'>Category:</strong> {post.category}</p>
        <p className='dm_sans'><strong className='oswald text-xl'>Tags:</strong> {post.tags.join(', ')}</p>
        <p className='dm_sans'><strong className='oswald text-xl'>Read time:</strong> {post.readTime}</p>
        <p className='dm_sans'><strong className='oswald text-xl'>Likes:</strong> {post.likes}</p>
        <p className='dm_sans'><strong className='oswald text-xl'>Shares:</strong> {post.shares}</p>
        <p className='dm_sans'><strong className='oswald text-xl'>Comments:</strong> {post.commentsCount}</p>
      </div>


    </div>
  );
};

export default SinglePostPage;
