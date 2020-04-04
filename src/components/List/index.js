import React from 'react';

import { MdAdd } from 'react-icons/md';

import Card from '../Card';

import { Container } from './styles';

export default function List({ data, index: listIndex }) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{data.title}</h2>
        {data.creatable && ( 
          <button type="button"> {/* apenas mostra o botão se creatable for true*/}
            <MdAdd size={24} color="#fff" /> 
          </button>
        )}
      </header>

      <ul>
        {/* index: posição do ngc no array */}
        { data.cards.map((card, index) => (
          <Card 
            key={card.id} 
            listIndex={listIndex}
            index={index}  
            data={card} 
          />
        )) } 
      </ul>
    </Container>
  );
}
