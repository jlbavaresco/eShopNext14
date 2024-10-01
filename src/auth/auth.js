
// tutorial https://medium.com/@pawanrijal/building-authentication-in-a-next-js-14-app-using-nextauth-and-prisma-59c9d67a0eca
import CredentialsProvider from "next-auth/providers/credentials";
import { autenticaUsuarioDB } from "@/bd/useCases/usuarioUseCases";

export const authOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Email e senha",
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
                return {   
                    id : usuario.email,                
                    email: usuario.email,
                    name: usuario.nome,
                    randomKey: parseInt(Math.random() * 45)
                };                
            },
        }),
    ],
    callbacks: {
        session: ({ session, token }) => {
          console.log("Session Callback", { session, token });
          return {
            ...session,
            user: {
              ...session.user,
              id: token.id,
              nome : session.user.nome,
              randomKey: token.randomKey,
            },
          };
        },
        jwt: ({ token, user }) => {
          console.log("JWT Callback", { token, user });
          if (user) {
            const u = user;
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