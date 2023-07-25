import styles from "../styles/Banner.module.css"
import React from 'react'

function Banner() {
    const spans = ["𝕮𝖆𝖘𝖍 𝖔𝖓 𝖉𝖊𝖑𝖎𝖛𝖊𝖗𝖞","𝕬𝖋𝖋𝖗𝖔𝖗𝖉𝖆𝖇𝖑𝖊 𝖜𝖎𝖙𝖍 𝖓𝖔 𝖉𝖊𝖑𝖎𝖛𝖊𝖗𝖞 𝕮𝖍𝖆𝖗𝖌𝖊","𝕮𝖚𝖘𝖙𝖔𝖒𝖎𝖟𝖊𝖉 𝕺𝖗𝖉𝖊𝖗𝖘"]
  return (
    <section id="description"className={styles.banner}>
    <div className={styles.content}>
      <h1>𝕱𝖆𝖘𝖙 𝖋𝖔𝖔𝖉, 𝖒𝖆𝖉𝖊 𝖋𝖗𝖊𝖘𝖍, 𝖗𝖎𝖌𝖍𝖙 𝖙𝖔 𝖞𝖔𝖚𝖗 𝖉𝖔𝖔𝖗</h1>

        <span className={styles.calltoaction}>
        <br/>
            <i>&emsp;&emsp;{spans[1]}</i><br/><br/>
            <i>&emsp;&emsp;&emsp;&emsp;{spans[0]}</i><br/><br/>
            <i>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{spans[2]}</i><br/>
            

        </span>
    </div>
    <img src="https://firebasestorage.googleapis.com/v0/b/hfc-resto.appspot.com/o/34da4c4e-82c3-47d7-953d-121945eada1e00-giveitup-unhealthyfood.jpg?alt=media&token=90724500-b11f-4922-9af8-3c1587a1fadd" />
  </section>
  )
}

export default Banner