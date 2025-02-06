import { CiCircleInfo } from "react-icons/ci";

function LastTransactions({ transactions }) {
  return (
    <>
      <h2 className="mt-6 mb-2 font-medium">Letzte Umsätze</h2>
      <table className="w-full font-medium rounded-sm">
        <thead className="bg-gray-100 text-gray-900">
          <tr className="text-left">
            <th className="p-4">Umsatz</th>
            <th className="p-4">Betrag</th>
            <th className="p-4">Datum</th>
            <th className="p-4">Verwendungszweck</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 &&
            transactions.map((transaction) => {
              return (
                <tr key={transaction.id} className="border-b border-gray-200">
                  <td className="p-4 text-gray-700">
                    {transaction.description}
                  </td>
                  <td
                    className={
                      +transaction.amount > 0
                        ? "text-green-800 p-4"
                        : "text-red-800 p-4"
                    }
                  >
                    <span
                      className={
                        +transaction.amount > 0
                          ? "bg-green-50 rounded-sm p-2"
                          : "bg-red-50 rounded-sm p-2"
                      }
                    >
                      {+transaction.amount > 0 && "+"}
                      {transaction.amount} €
                    </span>
                  </td>
                  <td className="p-4 text-gray-700">{transaction.date}</td>
                  <td className="p-4 max-w-7 overflow-hidden">
                    {/* UNSICHERE Ausgabe des Verwendungszwecks per dangerouslySetInnerHTML */}
                    <div
                      dangerouslySetInnerHTML={{ __html: transaction.purpose }}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {transactions.length <= 0 && (
        <div className="mt-4 flex gap-2 items-center text-gray-600">
          <CiCircleInfo size={"32px"} />
          Keine Umsätze vorhanden.
        </div>
      )}
    </>
  );
}

export default LastTransactions;
