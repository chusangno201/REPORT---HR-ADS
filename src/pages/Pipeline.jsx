import React from "react";
import { leads } from "../data/mock";
import { shortMoney } from "../utils/format";
import { Badge } from "../components/UI";

const stages = ["Lead mới", "Tư vấn", "Đặt lịch", "Báo giá"];
export default function Pipeline() {
  return (
    <div className="page-stack">
      <div className="toolbar">
        <div className="date-chip">Pipeline tháng 10</div>
        <button className="btn secondary">Lọc nâng cao</button>
        <button className="btn primary">+ Tạo cơ hội</button>
      </div>
      <div className="kanban">
        {stages.map((stage) => {
          const items = leads.filter((l) => l.stage === stage);
          const total = items.reduce((s, x) => s + x.value, 0);
          return (
            <section className="kanban-col" key={stage}>
              <header>
                <div>
                  <b>{stage}</b>
                  <span>
                    {items.length} cơ hội · {shortMoney(total)}
                  </span>
                </div>
                <em>{items.length}</em>
              </header>
              <div className="kanban-body">
                {items.map((l) => (
                  <article className="deal-card" key={l.id}>
                    <div className="deal-top">
                      <Badge tone={l.age >= 4 ? "danger" : "neutral"}>
                        {l.age} ngày
                      </Badge>
                      <span>{l.source}</span>
                    </div>
                    <h3>{l.customer}</h3>
                    <strong>{shortMoney(l.value)}</strong>
                    <p>Phụ trách: {l.owner}</p>
                    <div className="prob">
                      <span style={{ width: `${l.probability}%` }} />
                    </div>
                    <small>{l.probability}% khả năng chốt</small>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
