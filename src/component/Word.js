import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function World({ word: w }) {
  console.log('w', w);
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);
  const history = useHistory();

  function toggleShow() {
    setIsShow(!isShow);
  }

  //체크리스트(수정)
  function toggleDone() {
    // setIsDone(!isDone);
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...word,
        isDone: !isDone,
      }),
    }).then(res => {
      if (res.ok) {
        //응답이 OK이면, state 변경
        setIsDone(!isDone);
      }
    });
  }

  //삭제버튼
  function del() {
    if (window.confirm('삭제 하시겠습니까?')) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: 'DELETE',
      }).then(res => {
        if (res.ok) {
          setWord({ id: 0 });
          history.push('/');
        }
      });
    }

    if (word.id === 0) {
      return null;
    }
  }

  return (
    <tr className={isDone ? 'off' : ''}>
      <td>
        <input type="checkbox" onChange={toggleDone} checked={isDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button>
        <button className="btn_del" onClick={del}>
          삭제
        </button>
      </td>
    </tr>
  );
}
