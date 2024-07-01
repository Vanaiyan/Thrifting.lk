// import React from 'react';
// import { Card, CardHeader, Avatar } from '@mui/material';

// const UserCard = ({ user }) => {
//   const { firstName, lastName, email, avatar } = user;

//   // Function to generate a random background color
//   const getRandomColor = () => {
//     const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
//     const randomIndex = Math.floor(Math.random() * colors.length);
//     return colors[randomIndex];
//   };

//   return (
//     <Card style={{ maxWidth: '350px', height: '100px' }}>
//       <CardHeader
//         avatar={
//           <Avatar
//             alt={`${firstName} ${lastName}`}
//             src={avatar}
//             sx={{
//               bgcolor: avatar ? undefined : getRandomColor(), // Set random background color if avatar is not available
//             }}
//           >
//             {!avatar && `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`}
//           </Avatar>
//         }
//         title={`Name: ${firstName} ${lastName}`}
//         subheader={`Email: ${email}`}
//       />
//     </Card>
//   );
// };

// export default UserCard;



import React from 'react';
import { Card, CardHeader, Avatar } from '@mui/material';

const BuyerCard = ({ buyer }) => {
  const { firstName, lastName, email, profilePicture } = buyer;

  // Function to generate a random background color
  const getRandomColor = () => {
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722'];
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };

  // Determine the avatar content and styles
  const avatarContent = profilePicture ? null : `${firstName.charAt(0).toUpperCase()}${lastName.charAt(0).toUpperCase()}`;
  const avatarStyle = profilePicture ? {} : { bgcolor: getRandomColor() };

  return (
    <Card style={{ maxWidth: '400px', height: '80px' }}>
      <CardHeader
        avatar={
          <Avatar alt={`${firstName} ${lastName}`} src={profilePicture} sx={avatarStyle}>
            {avatarContent}
          </Avatar>
        }
        title={`${firstName} ${lastName}`}
        subheader={`Email: ${email}`}
      />
    </Card>
  );
};

export default BuyerCard;
