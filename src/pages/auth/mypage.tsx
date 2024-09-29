// "use client";

// import { useUserStore } from "@/hooks/useUserStore";
// import { useRouter } from "next/navigation";

// const MyPage = () => {
//     const user = useUserStore((state) => state.user);
//     const setUser = useUserStore((state) => state.setUser);
//     const router = useRouter();

//     const logout = () => {
//         setUser("");
//         router.push("/");
//     }
//     return (
//         <div>
//             유저: {user}
//             <button
//                 onClick={logout}>로그아웃</button>
//         </div>
//     )
// }

// export default MyPage;