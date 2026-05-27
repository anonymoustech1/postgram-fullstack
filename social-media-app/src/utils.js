// export const randomAvatar = () =>
//     `https://i.pravatar.cc/300?img=${Math.floor(Math.random() * 60) + 1}`;
// Exclude specific image IDs that have issues
export const randomAvatar = () => {
    const problematicIds = [/* add IDs that show the warning */];
    let imgId;
    do {
        imgId = Math.floor(Math.random() * 60) + 1;
    } while (problematicIds.includes(imgId));
    
    return `https://i.pravatar.cc/300?img=${imgId}`;
};

/**
 * the ensense of doing this is to use a website that generates random avatars for the avatar. 
/**
 * The pravatar service supports parameters in the URL and has over 60 images. am using the Math library to generate a random number representing the image’s ID. We can now write the Layout component.
 */