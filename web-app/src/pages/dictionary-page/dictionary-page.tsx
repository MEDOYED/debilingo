import { AddWordCardModal } from "./ui/add-word-card/add-word-card";
import { DictionaryTopBar } from "./ui/dictionary-top-bar/dictionary-top-bar";

import { cn } from "@shared/lib/styles";

import s from "./dictionary-page.module.scss";

export const DictionaryPage = () => {
  return (
    <main className={cn(s.dictionaryPage, "container")}>
      <DictionaryTopBar />

      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nostrum iusto
        odit ad optio ea dolores, distinctio nulla quisquam exercitationem!
        Ratione nesciunt sequi dicta accusamus voluptatem possimus impedit
        necessitatibus, molestias esse! Officia repudiandae distinctio cum
        delectus dolores, accusantium possimus magnam harum suscipit quas natus,
        in voluptatem eaque, hic rem corrupti. A non, quaerat nihil vel quis
        atque. Nihil labore qui iste! Vel ad in exercitationem sint. Provident
        doloremque esse ullam necessitatibus id ex fugiat sit eos in ipsam?
        Doloremque tempora, eaque hic dolores at praesentium, harum, repudiandae
        facilis animi error totam. Necessitatibus deleniti accusamus delectus
        cum obcaecati dolorum, dolorem natus, dolore omnis voluptas suscipit?
        Distinctio praesentium harum quia sed, repudiandae nulla perspiciatis
        voluptatum explicabo velit delectus nesciunt id quos ex natus? Dolorem
        iure nulla laboriosam perferendis et doloremque sed provident culpa
        quibusdam inventore molestiae laudantium aut laborum pariatur est,
        sapiente nihil quidem suscipit cum exercitationem, odio, ratione
        cupiditate. Possimus, facilis ea? Animi quisquam repellat corporis!
        Totam non et corrupti dolorem quam libero corporis, vel, animi quis
        recusandae sint in accusantium, sit quidem nihil officia facere quasi.
        Labore impedit accusamus neque tempore. Facere enim non beatae? Ad
        aliquid nisi error cupiditate eveniet possimus, facilis hic harum libero
        sit id fugiat! Earum consectetur in vitae quia perferendis molestias,
        dignissimos sequi consequuntur alias corrupti. Voluptatibus tempore
        quisquam dicta officia, eum quasi, quaerat nihil repellat cupiditate
        quod nulla error omnis nam itaque consequuntur dolorum. Minus nemo
        tempora unde hic sint cum accusantium cupiditate voluptatum nobis. Illo
        aliquid, voluptatem ab quidem itaque veritatis, incidunt qui sint minus
        commodi, omnis repellat cupiditate ipsa debitis. Exercitationem veniam
        asperiores, odit eveniet saepe quas soluta eius iure aliquid vel
        excepturi. Magni, hic mollitia? Recusandae nulla quos distinctio
        consequatur! Non animi excepturi eveniet odio cum debitis tempore quod.
        Illo nobis deserunt asperiores error in culpa eaque necessitatibus
        molestiae ad, soluta eius. Alias in tenetur corrupti unde ducimus quasi
        assumenda blanditiis, molestias facere fugit deleniti perferendis optio
        doloribus repellat ratione eveniet facilis perspiciatis, aut voluptate
        libero explicabo ex, vitae consectetur. Placeat, soluta. Eius porro
        atque veritatis. Cumque laborum a illum voluptates asperiores? Dolor
        error quaerat, architecto facere, magnam natus perspiciatis quisquam ut
        laudantium deleniti ducimus voluptates distinctio non veritatis eum
        vero. Hic? Harum omnis ab est, dolore dolorem soluta doloremque non
        delectus debitis ex, corporis porro excepturi sed ut distinctio
        perferendis iste ratione quam sit, dignissimos incidunt fugiat id
        tempore. Voluptates, nam! Quibusdam, eius maxime! Sit molestias a ipsum
        blanditiis distinctio, quam, nobis, necessitatibus odit quaerat deleniti
        corrupti. Ullam aperiam magnam accusamus harum, aut, asperiores sapiente
        vitae maiores magni id eius. Modi. Quis aut recusandae doloribus
        repellat autem vel perferendis minus. Temporibus hic vitae eveniet
        voluptatum molestiae, nostrum a in enim! Quod soluta nihil natus ipsa
        dicta alias eveniet iusto? Est, saepe! Dignissimos blanditiis maiores
        enim, eveniet accusamus odio natus, similique culpa voluptatem
        reprehenderit illum facilis explicabo, dolorum quae sed quos temporibus
      </div>

      <AddWordCardModal />
    </main>
  );
};
