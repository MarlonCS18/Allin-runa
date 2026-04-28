// app/components/BlogCard.js
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function BlogCard({ post }) {
  return (
    <Link 
      href={`/blog/${post.slug}`} 
      className="block group"
    >
      <div className="rounded-lg overflow-hidden shadow-lg bg-white">
        <div className="relative w-full h-52">
          <Image
            src={post.image}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-6">
          <span className="text-sm text-green-700 font-semibold">{post.category}</span>
          <h3 className="text-xl font-bold text-gray-800 mt-2 mb-3 h-14">
            {post.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 h-20 overflow-hidden">
            {post.summary}
          </p>
          <span className="font-semibold text-green-600 group-hover:underline">
            Leer Más →
          </span>
        </div>
      </div>
    </Link>
  );
}