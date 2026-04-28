// app/blog/[slug]/page.js
import React, { use } from 'react'; 
import Image from 'next/image';
import { getPostData, getRelatedPosts, getBlogPosts } from '../../../lib/blogData';
import BlogCard from '../../components/BlogCard';

// Esta función sigue igual, está perfecta.
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function PostPage({ params }) { 
  
  const resolvedParams = use(params); 
  const post = getPostData(resolvedParams.slug);
  const relatedPosts = getRelatedPosts(resolvedParams.slug);

  if (!post) {
    return <div>Post no encontrado (slug: {resolvedParams.slug}).</div>;
  }

  // Si el post se encuentra, renderiza la página
  return (
    // <main> sigue igual, 'flex flex-col items-center'
    <main className="flex flex-col items-center">

      {/* --- SECCIÓN 1: IMAGEN PRINCIPAL --- */}
      
      {/* ¡AQUÍ ESTÁ EL ARREGLO! */}
      {/* Añadimos '-mt-16' para que esta sección "suba" 64px 
          y se meta detrás de tu header (que mide h-16) */}
      <section className="relative w-full h-[60vh] -mt-16">
        <Image
          src={post.image}
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="brightness-75" 
        />
      </section>

      {/* --- SECCIÓN 2: TÍTULO Y CONTENIDO --- */}
      {/* Esta sección no se toca. Empezará justo después de 
          la imagen de 60vh, y como tiene un fondo claro 
          (el bg-zinc-50 del body), el texto oscuro del 
          artículo se leerá perfectamente. */}
      <article className="w-full max-w-3xl px-4 py-20">
        
        <span className="text-green-700 font-semibold">{post.category}</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-2 mb-6">
          {post.title}
        </h1>
        
        <div 
          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
      </article>

      {/* --- SECCIÓN 3: POSTS RELACIONADOS --- */}
      <section className="w-full max-w-6xl px-4 py-20 border-t">
        <h2 className="text-3xl font-bold text-center mb-12">
          También te podría interesar
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((related) => (
            <BlogCard key={related.id} post={related} />
          ))}
        </div>
      </section>

    </main>
  );
}