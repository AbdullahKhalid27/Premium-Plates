import type { ComponentProps } from "react";
export default function StoreLink({href="",...props}:ComponentProps<"a">){
 if(!href.startsWith("/")) return <a {...props} href={href}/>;
 const path=href.split(/[?#]/,1)[0];
 const target="/Premium-Plates"+path+(path.endsWith("/")?"":"/")+href.slice(path.length);
 return <a {...props} href={target}/>;
}
