
// tutorial https://medium.com/@pawanrijal/building-authentication-in-a-next-js-14-app-using-nextauth-and-prisma-59c9d67a0eca
import CredentialsProvider from "next-auth/providers/credentials";
import { autenticaUsuarioDB } from "@/bd/useCases/usuarioUseCases";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 1800, // tempo em segundos - 30 minutos
    },
    pages: {
        signIn: '/login', //(4) custom signin page path
      },
    providers: [
        CredentialsProvider({           
           name : "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "example@example.com",
                },
                senha: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.senha) {                    
                    return null;
                }

                let usuario = null;
                try {
                    usuario = await autenticaUsuarioDB(credentials);
                } catch (err) {
                    return null;
                }

                if (!usuario) {
                    return null;
                }                                       
                // return {   
                //     id : usuario.email,                
                //     email: usuario.email,
                //     name: usuario.nome,   
                //     tipo : usuario.tipo,                 
                //     randomKey: parseInt(Math.random() * 9999)
                // };   
                // aqui para retornar o tipo tem que colocar esta informação adicional
                return { tipo: usuario.tipo ?? "user",   
                  id : usuario.email,                
                  email: usuario.email,
                  name: usuario.nome,                 
                  randomKey: parseInt(Math.random() * 9999)
               }             
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
          console.log("Session Callback", { session, token });
          // aqui para pegar o tipo que foi adicionado no return do authorize e colocar na sessão
          session.user.tipo = token.tipo;
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              name : session.user.name,
              randomKey: token.randomKey,
            },
          };
        },
        jwt: ({ token, user }) => {
          console.log("JWT Callback", { token, user });          
          if (user) {
            const u = user;  
            token.tipo = user.tipo;          
            return {
              ...token,
              id: u.id,
              randomKey: u.randomKey,
            };
          }
          return token;
        },
      },    
};