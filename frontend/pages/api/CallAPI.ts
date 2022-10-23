export async function getUserByUsername(username: any) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const data = await res.json()

    const user = data.find((u: any) => u.name == username.current?.value)
    console.log(user)
    return user
  } catch (err) {
    console.log(err)
  }
}

export async function getPhotoByID(photoID: any) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos`)
    const data = await res.json()

    const photo = data.find((p: any) => p.id == photoID.current?.value)
    console.log(photo)
    return photo
  } catch (err) {
    console.log(err)
  }
}

export async function getUserByLoginAndPassword(
  userLogin: any,
  userPassword: any,
) {
  try {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users`)
    const data = await res.json()

    const user = data.find(
      (u: any) =>
        u.email == userLogin.current?.value &&
        u.address.zipcode == userPassword.current?.value,
    )
    console.log(user)
    return user
  } catch (err) {
    console.log(err)
  }
}
