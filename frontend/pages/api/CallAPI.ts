import Photo from "../../components/interfaces/photo";

export async function getUserByUsername(username: any) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await res.json();

    const user = data.find((u: any) => u.name == username.current?.value);
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotos() {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos`);
    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotoByID(photoID: any) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoID}`);
    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotoByUser(user: any) {
  try {
    const resUserAlbums = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`);
    const dataUserAlbums = await resUserAlbums.json();
    const data: any = [];

    for(let i = 0; i < dataUserAlbums.length; i++)
    {
      const resPhotos = await fetch(`https://jsonplaceholder.typicode.com/albums/${dataUserAlbums[i].id}/photos`);
      const dataPhotos = await resPhotos.json();

      for(let j = 0; j < dataPhotos.length; j++)
      {
          data.push(dataPhotos[j]);
      }
    }

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getPhotoByAlbumID(albumID: any) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumID}/photos`);
    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserByLoginAndPassword(
  userLogin: any,
  userPassword: any
) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
    const data = await res.json();

    const user = data.find(
      (u: any) =>
        u.email == userLogin.current?.value &&
        u.address.zipcode == userPassword.current?.value
    );
    console.log(user);
    return user;
  } catch (err) {
    console.log(err);
  }
}

export async function getUserPosts(user: any) {
  try {
    const resPosts = await fetch(`https://jsonplaceholder.typicode.com/posts`);
    const dataPosts = await resPosts.json();

    const posts = dataPosts.filter((p: any) => p.userId == user.id);

    console.log(posts);
    return posts;
  } catch (err) {
    console.log(err);
  }
}

export async function createUser(user: any) {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify({
        email: user.email,
        name: user.name,
        username: user.username,
        phone: user.phone,
        website: user.website,
        street: user.street,
        suite: user.suite,
        city: user.city,
        zipcode: user.zipcode,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });

    const data = await res.json();

    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}
