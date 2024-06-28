import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request : NextRequest)
{
    const path = request.nextUrl.pathname;

    const isPublicPath = path.includes('/login') || path.includes('/signup') || path.includes('/verifyemail')
 
    const isPrivatePath =  path.includes('/profile') || path.includes('/createBlog') ||  path.includes('/blogs') 

    const token = request.cookies.get('token')?.value || '';

   

    if(isPrivatePath && token ==='')
    {
        return NextResponse.redirect(new URL('/login' , request.nextUrl));
    }
    if(isPublicPath && token)
    {
        return NextResponse.redirect(new URL('/' , request.nextUrl));
    }
    


}

export const config = {
    matcher:[
        '/',
        '/profile',
        '/login',
        '/signup',
        '/blogs',
        '/createBlog',
    ],
}