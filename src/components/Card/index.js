import React, { useRef, useContext } from 'react'; // useContext: acessar informações de um contexto
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

import { Container, Label } from './styles';

export default function Card({ data, index, listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({ // estado e referencia do elemento sendo manipulado
    item: { type: 'CARD', index, listIndex },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({ /* colocamos isso nos "containers" (podem receber elementos) */
    accept: 'CARD', /* quais tipos de elementos o drop pode receber */
    hover(item, monitor) { /* quando um CARD for passado por cima de outro. item = qual CARD está sendo arrastado. monitor = informaçõezinhas */
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;
      
      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) return;

      const targetSize = ref.current.getBoundingClientRect(); // tamanho do elemento
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset(); // o quanto do item foi arrastado
      const draggedTop = draggedOffset.y - targetSize.top; // distancia de que o item arrastado entrou para dentro do novo card


      if (draggedIndex < targetIndex && draggedTop < targetCenter) return; // se o item sendo arrastado estava antes do item recebendo o arraste EE este estiver acima do que está sendo arrastado NADA ACONTECE

      if (draggedIndex > targetIndex && draggedTop > targetCenter) return;

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex; // o item mudou de posição (resolução daquele bug de movimento)
      item.listIndex = targetListIndex;
    }
  })

  dragRef(dropRef(ref)); // não é possível passar 2 referências para um elemento. essa é uma forma de "abrigar" as duas

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        { data.labels.map(label => <Label key={label} color={label} />) }
      </header>

      <p>{data.content}</p>
      { data.user && <img src={data.user} alt=""/> } {/* mostrar a imagem apenas quando houver um user */}
    </Container>
  );
}
