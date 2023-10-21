import React from "react";

function getUser() {
  return Promise.resolve({ id: "1", name: "Robin" });
}

function App_test() {
  const [search, setSearch] = React.useState("");
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    const loadUser = async () => {
      const user = await getUser();
      setUser(user);
    };

    loadUser();
  }, []);

  // React.useEffect(() => {
  //   console.log("とおった");
  // }, [search]);

  const [animal, setAnimal] = React.useState("Dog");

  //重要：つまり依存配列が変更しなければ再度レンダリングされない
  // useCallbackを使用して、同じ動物の音を繰り返し再生する関数を作成
  const playSound = React.useCallback(() => {
    if (animal === "Dog") {
      console.log("Woof! Woof!");
    } else if (animal === "Cat") {
      console.log("Meow! Meow!");
    } // ... 他の動物の音も追加できます
  }, [animal]); // 'animal'の値が変わるたびに新しい動物の音を再生

  // userがundefinedの場合、何も表示しない
  if (user === undefined) return null;

  function handleChange(event) {
    setSearch(event.target.value);
  }

  return (
    <div>
      {user ? <p>Signed in as {user.name}</p> : null}

      <Search value={search} onChange={handleChange}>
        Search:
      </Search>

      <p>Searches for {search ? search : "..."}</p>
      <button onClick={() => setAnimal("Dog")}>Choose Dog</button>
      <button onClick={() => setAnimal("Cat")}>Choose Cat</button>
      {/* ... 他の動物のボタンも追加できます */}
      <br />
      <button onClick={playSound}>Play Sound</button>
    </div>
  );
}

// export function Search({ value, onChange, children }) {
//   return (
//     <div>
//       <label htmlFor="search">{children}</label>
//       <input id="search" type="text" value={value} onChange={onChange} />
//     </div>
//   );
// }

export function Search({ value, onChange, children }) {
  return (
    <div>
      <label htmlFor="search">{children}</label>
      <input
        id="search"
        type="text"
        value={value}
        onChange={onChange}
        data-testid="search"
      />
    </div>
  );
}

export default App_test;
