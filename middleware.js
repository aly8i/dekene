import {NextResponse,NextRequest} from "next/server";
import {jwtVerify} from 'jose';

export default async function middleware(req) {
    const token =  req.cookies.get('accessToken');
    const url = req.url;
    var p = {}
    if(url.includes("/admin")){
        try{
            const {payload} = await jwtVerify(token, new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET));
            p=payload
        }catch(e){
            return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
        }
        if(p.role =='admin'){
            return NextResponse.next();
        }
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}`);
    }
    return NextResponse.next();
}
