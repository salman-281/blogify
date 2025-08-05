'use client';

import { getAllBlogData } from '@/app/(home)/_actions/action';
import Comments from '@/components/Comments';
import { BlogPost } from '@/lib/blogs';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import  { useEffect, useState } from 'react';
import { RiLoader4Fill } from 'react-icons/ri';

const SinglePostPage = () => {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBlogData();
        const found = res.find((p: BlogPost) => p.id === params.id);
        setPost(found || null);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchData();
  }, [params.id]);

  if (!post) {
    return <div className="p-8 w-full flex justify-center items-center text-gray-500 text-center">
        <RiLoader4Fill className="animate-spin text-2xl text-orange-500" />
        </div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-orange-500 oswald">{post.title}</h1>

      <div className="flex items-center space-x-4 font-sans">
    <Image src={post.author.image} alt={post.author.name} height={48} width={48}  className="rounded-full" />
        <div>
          <p className="font-medium">{post.author.name}</p>
          <p className="text-sm text-gray-500">{post.date}</p>
        </div>
      </div>
      <Image src={post.imageUrl} alt={post.title} height={500} width={900} className=" rounded" />

      <p className="text-gray-700 dm_sans">{post.description}</p>

      <article className="prose max-w-none mt-4 dm_sans">
        <p>{post.markdownContent}</p>
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
