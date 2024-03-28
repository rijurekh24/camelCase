import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../Utils/api";

const Posts = () => {
  const { postId } = useParams();
  const [postData, setPostData] = useState({});
  const fetchSinglePost = () => {
    Api.get(`/posts/get?id=${postId}`)
      .then((res) => {
        setPostData(res.data.post);
      })
      .catch((err) => {
        console.log(err.res.data);
      });
  };

  useEffect(() => {
    if (postId) {
      fetchSinglePost();
    }
  }, [postId]);
  return (
    <Box>
      <Typography color={"textColor.main"}>{postData._id}</Typography>
      <Box height={400} width={400}>
        <Box
          component={"img"}
          bgcolor={"backgroundColor.main"}
          src={postData.img}
          sx={{ width: "100%", height: "100%", objectFit: "contain" }}
        ></Box>
      </Box>
    </Box>
  );
};

export default Posts;

// import {
//   Avatar,
//   Box,
//   Divider,
//   IconButton,
//   Skeleton,
//   Typography,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Api from "../Utils/api";
// import CommentBox from "./HomePageComponents/PostCards/CommentBox";
// import Comments from "./HomePageComponents/Modals/Comments";
// import { format, register } from "timeago.js";

// const Posts = () => {
//   const { postId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [postData, setPostData] = useState({});
//   register("custom", (number, index) => {
//     return [
//       ["just now", "right now"],
//       ["%ss", "in %ss"],
//       ["1m", "in 1m"],
//       ["%sm", "in %sm"],
//       ["1h", "in 1h"],
//       ["%sh", "in %sh"],
//       ["1d", "in 1d"],
//       ["%sd", "in %sd"],
//       ["1w", "in 1w"],
//       ["%sw", "in %sw"],
//       ["1mo", "in 1mo"],
//       ["%smo", "in %smo"],
//       ["1yr", "in 1yr"],
//       ["%syr", "in %syr"],
//     ][index];
//   });

//   const fetchSinglePost = () => {
//     setLoading(true);
//     Api.get(`/posts/get?id=${postId}`)
//       .then((res) => {
//         setPostData(res.data.post);
//         // console.log(res.data.post);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err.res.data);
//       });
//   };

//   useEffect(() => {
//     if (postId) {
//       fetchSinglePost();
//     }
//   }, [postId]);
//   return (
//     <Box
//       sx={{ height: "calc(100dvh - 4rem)" }}
//       display={"flex"}
//       justifyContent={"center"}
//       alignItems={"center"}
//     >
//       <Box
//         height={{ md: "90%" }}
//         borderRadius={"15px"}
//         bgcolor={{ xs: "backgroundColor.secondary" }}
//         display={"flex"}
//         justifyContent={"center"}
//         alignItems={"center"}
//         p={2}
//         gap={2}
//         flexDirection={{ xs: "column", md: "row" }}
//       >
//         <Box
//           sx={{
//             width: "100%",
//             height: "100%",
//           }}
//           bgcolor={{ md: "backgroundColor.main" }}
//           display={"flex"}
//           justifyContent={"center"}
//           alignItems={"center"}
//           borderRadius={"15px"}
//           flex={1}
//         >
//           <Box
//             component={"img"}
//             src={postData.img}
//             sx={{
//               width: "100%",
//               objectFit: "contain",
//               height: "100%",
//               borderRadius: "15px",
//             }}
//           ></Box>
//         </Box>

//         <Box
//           display={"flex"}
//           flexDirection={"column"}
//           flex={1}
//           sx={{
//             height: "100%",
//             width: { xs: "100%", md: "none" },
//           }}
//         >
//           <Box display="flex" gap={1} alignItems={"center"} mb={1}>
//             <Avatar></Avatar>
//             <Box>
//               <Typography color={"textColor.main"} fontSize={"1.2rem"}>
//                 Rijurekh Ghosh
//               </Typography>
//               <Typography
//                 sx={{ color: "textColor.secondary", fontSize: "0.7rem" }}
//               >
//                 {format(postData.date, "custom")}
//               </Typography>
//             </Box>
//           </Box>
//           {postData.caption && (
//             <Typography color={"textColor.main"}>{postData.caption}</Typography>
//           )}
//           <Divider color="#444" flexItem sx={{ marginTop: 1 }} />

//           {/* ************** */}

//           <Box display={"flex"} flex={1} justifyContent={"space-between"}>
//             <IconButton
//               aria-label="add to favorites"
//               disableRipple
//               //   onClick={handleLike}
//             >
//               <Typography
//                 color={"textColor.secondary"}
//                 fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
//               >
//                 <i className="fa-regular fa-heart"></i>
//                 {/* <i
//                   className={` ${
//                     clicked ? " fa-solid" : "fa-regular"
//                   } fa-heart`}
//                   style={{
//                     color: clicked ? "#DC381F" : "#999",
//                   }}
//                 ></i> */}
//               </Typography>
//               <Box display={{ xs: "none", sm: "block" }}>
//                 <Typography
//                   sx={{
//                     fontSize: "0.9rem",
//                     pl: 1,
//                     color: "textColor.main",
//                   }}
//                 >
//                   Like
//                 </Typography>
//               </Box>
//             </IconButton>
//             <IconButton aria-label="comment" disableRipple>
//               <Typography
//                 color={"textColor.secondary"}
//                 fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
//               >
//                 <i className="fa-regular fa-comment"></i>
//               </Typography>
//               <Box display={{ xs: "none", sm: "block" }}>
//                 <Typography
//                   sx={{
//                     fontSize: "0.9rem",
//                     pl: 1,
//                     color: "textColor.main",
//                   }}
//                 >
//                   Comment
//                 </Typography>
//               </Box>
//             </IconButton>

//             <IconButton aria-label="share" disableRipple>
//               <Typography
//                 color={"textColor.secondary"}
//                 fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
//               >
//                 <i className="fa-regular fa-paper-plane"></i>
//               </Typography>
//               <Typography
//                 display={{ xs: "none", sm: "block" }}
//                 sx={{
//                   fontSize: "0.9rem",
//                   pl: 1,
//                   color: "textColor.main",
//                 }}
//               >
//                 Share
//               </Typography>
//             </IconButton>
//             <IconButton aria-label="repost" disableRipple>
//               <Typography
//                 color={"textColor.secondary"}
//                 fontSize={{ xs: "1.5rem", sm: "1.3rem" }}
//               >
//                 <i className="fa-solid fa-repeat"></i>
//               </Typography>
//               <Typography
//                 display={{ xs: "none", sm: "block" }}
//                 sx={{
//                   fontSize: "0.9rem",
//                   pl: 1,
//                   color: "textColor.main",
//                 }}
//               >
//                 Repost
//               </Typography>
//             </IconButton>
//           </Box>

//           <Divider color="#444" flexItem sx={{ marginBottom: 1 }} />
//           {/* comment part */}
//           <Box
//             sx={{
//               overflowY: { xs: "scroll" },
//               display: "flex",
//               height: { xs: "100%" },
//               flexDirection: "column",
//               gap: 1,
//               "&::-webkit-scrollbar-track": {
//                 backgroundColor: "backgroundColor.secondary",
//               },
//               "&::-webkit-scrollbar-thumb": {
//                 backgroundColor: "primary.main",
//               },
//               "&::-webkit-scrollbar": {
//                 width: "2px",
//               },
//             }}
//           >
//             {loading ? (
//               <>
//                 <Skeleton variant="text" width={100} height={30} />
//                 <Skeleton variant="text" width={200} height={10} />
//                 <Skeleton variant="text" width={150} height={10} />
//                 <Skeleton variant="text" width={250} height={10} />
//               </>
//             ) : (
//               <>
//                 {postData.comments?.length > 0 ? (
//                   postData.comments.map((item, index) => (
//                     <Box mb={1} key={index}>
//                       <Comments
//                         comment={item.comment}
//                         username={item.commentator.username}
//                         name={item.commentator.first_name}
//                         date={item.date}
//                         dp={item.commentator.profile_pic}
//                       />
//                     </Box>
//                   ))
//                 ) : (
//                   <Box
//                     display={{ xs: "none", md: "flex" }}
//                     width={"100%"}
//                     height={"100%"}
//                     justifyContent={"center"}
//                     alignItems={"center"}
//                   >
//                     <Typography color="textColor.main">No Comments</Typography>
//                   </Box>
//                 )}
//               </>
//             )}
//           </Box>
//           <Box>
//             {/* <CommentBox postId={postId} fetchComment={fetchComment} /> */}
//             <CommentBox postId={postData._id} fetchComment={fetchSinglePost} />
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Posts;
