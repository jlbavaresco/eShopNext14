import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/auth";


export async function middleware(req) {

    console.log('chamou o middleware')

         const session = await getServerSession(authOptions);

    if (!session) {
        // redirect("/api/auth/signin");
        const url = new URL("/api/auth/signin", req.url);
        url.searchParams.set("callbackUrl", req.url); // Redireciona de volta após o login
        return NextResponse.redirect(url);        
     }

//   // Verifica o token do usuário
//   const token = await getToken({ req });

//   // Se o usuário não tiver um token, redireciona para a página de login
//   if (!token) {
//     const url = new URL("/api/auth/signin", req.url);
//     url.searchParams.set("callbackUrl", req.url); // Redireciona de volta após o login
//     return NextResponse.redirect(url);
//   }

  // Se o usuário estiver autenticado, permite o acesso
  return NextResponse.next();
}

// Configura o middleware para rodar apenas em /privado
export const config = {
  matcher: ["/privado/:path*"],
};