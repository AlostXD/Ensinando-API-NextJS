import prisma from "./lib/prisma";


export default async function Home() {
  const info = await prisma.teste.findMany();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen p-2">
        {info.map((info) => (
          <div key={info.id} className="p-4 m-2 bg-gray-200 rounded shadow text-black">
            <h2 className="text-lg font-bold">{info.nome}</h2>
            <p>Idade: {info.idade}</p>
            <p>Curso: {info.curso}</p>
          </div>
          ))
        }
      </div>
    </>
  );
}
