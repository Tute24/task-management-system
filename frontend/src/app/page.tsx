import TaksDisplay from "./(components)/tasks-display"

const tasksArray = [
  {
    id: 1,
    taskTitle: 'Comprar mantimentos',
    taskDescription: 'Ir ao supermercado e comprar frutas, legumes e ovos.',
    createDate: Date.now(),
  },
  {
    id: 2,
    taskTitle: 'Estudar React',
    taskDescription:
      'Revisar hooks e criar um pequeno projeto com useEffect e useState.',
    createDate: Date.now(),
  },
  {
    id: 3,
    taskTitle: 'Fazer exercício',
    taskDescription: 'Treinar costas e bíceps na academia.',
    createDate: Date.now(),
  },
  {
    id: 4,
    taskTitle: 'Organizar arquivos',
    taskDescription:
      'Limpar a pasta de downloads e mover arquivos para pastas corretas.',
    createDate: Date.now(),
  },
  {
    id: 5,
    taskTitle: 'Ligar para o banco',
    taskDescription: 'Resolver pendência com o cartão de crédito.',
    createDate: Date.now(),
  },
  {
    id: 6,
    taskTitle: 'Atualizar portfólio',
    taskDescription: 'Adicionar o novo projeto de dashboard no portfólio.',
    createDate: Date.now(),
  },
  {
    id: 7,
    taskTitle: 'Planejar semana',
    taskDescription: 'Definir metas e tarefas para os próximos dias.',
    createDate: Date.now(),
  },
]

export default function Home() {
  return (
    <>
      <div className="flex flex-col text-xl font-bold items-center m-auto justify-center text-center gap-5 py-5">
        <h1>Here is Your Task List!</h1>
        <h2 className="text-lg text-blue-800">
          You can see all the tasks that you have created. Updating and deleting
          them is also a possibility!
        </h2>
      </div>
      <div className="flex max-w-[750px] min-w-[400px] items-center justify-center text-center m-auto">
        <TaksDisplay tasksListData={tasksArray}/>
      </div>
    </>
  )
}
