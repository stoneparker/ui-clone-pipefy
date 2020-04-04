import React, { useState } from 'react';
import produce from 'immer'; // o nome é livre

import BoardContext from './context';

import List from '../List';

import { loadLists } from '../../services/api';
import { Container } from './styles';

const data = loadLists();

export default function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList, toList, from, to) {
    setLists(produce(lists, draft => { // cópia da listagem que depois substituira a original através do produce
      const dragged = draft[fromList].cards[from];

      draft[fromList].cards.splice(from, 1); // removendo da lista o item que está sendo arrastado

      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  {/* fornecer um valor ao contexto, em que todos os elementos dentro desse contexto têm acesso */}

  {/* em data é passado todos os dados que vem em cada uma dessas listas */}
  return (
    
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => <List key={list.title} data={list} index={index} />)}  
      </Container>
    </BoardContext.Provider>
  );
}
