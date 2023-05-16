import React from 'react'
import Card from './Card'

export default function List() {
  const [items, setItems] = React.useState([])

  React.useEffect(() => {

    async function runEffect(){
      const res = await fetch('https://swapi.dev/api/people')
      const json = await res.json()
      const people = json.results

      const peopleWithId = people.map( person => {
        return {
         ...person,
         id: crypto.randomUUID(),
        }
      })
      setItems(peopleWithId)
    }
    
    runEffect();
  }, [])

  console.log(items);


  return (
    <>
      {items.length > 0 && 
      items.map( (item) => (<Card><div key={item.id}>{item.name}</div></Card>))
      }
    </>
  )
}


