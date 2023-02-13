import { FETCH_ALL, CREATE, DELETE, LIKE, disLIKE, ADD_USERNAME,REMOVE_USERNAME, UPDATE_POST} from '../constants/actionTypes';

export default (posts = [], action) => {
  const arrayWithout = (item ,elist)=>{
  
    elist.filter(function (letter) {
    return letter !== item;
  })}
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;
    case LIKE:
     return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
     case disLIKE:
     return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    case CREATE:
      return [...posts, action.payload];
      case ADD_USERNAME:
  return posts.map(post => {
    if (post._id === action.payload.id) {
      return {
        ...post,
        postListUsernames: (post.postListUsernames || []).concat(action.payload.username)
      }
    }
  
    return post;
  });



          case REMOVE_USERNAME:
  return posts.map((post) => {
    if (post._id !== action.payload.id) {
      return post;
    }
    const filteredDisLikeUsernames = post.postListDisLikeUsernames.filter(username => username !== action.payload.username)
    return {
      ...post,
      postListDisLikeUsernames: filteredDisLikeUsernames
    };
  });
  case UPDATE_POST:
      return posts.map(post => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    default:
      return posts;
  }
};

// case ADD_USERNAME:
//   return posts.map(post => {
//     if (post._id === action.payload.id) {
//       return {
//         ...post,
//         postListUsernames: (post.postListUsernames || []).concat(action.payload.username)
//       }
//     }
//     return post;
//   });

//           case REMOVE_USERNAME:
//   return posts.map((post) => {
//     if (post._id !== action.payload.id) {
//       return post;
//     }
//     const filteredDisLikeUsernames = post.postListDisLikeUsernames.filter(username => username !== action.payload.username)
//     return {
//       ...post,
//       postListDisLikeUsernames: filteredDisLikeUsernames
//     };
//   });



  // case ADD_USERNAME:
  // return posts.map((post) => {
  //   if (post._id === action.payload._id) {
  //     post.postListLikeUsernames = arrayWithout(action.username, post.postListLikeUsernames);
  //     post.postListDisLikeUsernames.push(action.username);
  //     return post;
  //   }
  //   return post;
  // });

      // case ADD_USERNAME:
      //   return posts.map(post => {
      //     if (post._id === action.payload.id) {
      //       return {
      //         ...post,
      //         postListUsernames: post.postListUsernames.filter(username => username !== action.payload.username)
      //       }
      //     }});