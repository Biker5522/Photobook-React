export async function getUserByUsername (username: any) 
{
        try {
          const res = await fetch(`https://jsonplaceholder.typicode.com/users`);
          const data = await res.json();

          const user = data.find(
            (u: any) => u.username == username.current?.value
          );
          console.log(user);
          return user;
        } catch (err) {
          console.log(err);
        }
}
