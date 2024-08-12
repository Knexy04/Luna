import Item from "../../components/item";
import module from '../cart.module.css';

const FirstStep = ({ price, sale, goToNextStep, doc }) => {
    const discount = price - sale;
    return (
        <>
            <div className={`xl:px-64 md:px-32`}>
                <div className={`${module.TotalBlock} total mt-10`}>
                    <div>
                        <div className="text-2xl font-bold">Сумма заказа</div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between mt-5">
                                <div>Стоимость</div>
                                <div>{price}</div>
                            </div>
                            <div className="flex justify-between">
                                <div>Скидка</div>
                                <div>{sale}</div>
                            </div>
                            <div className="flex justify-between bg-black bg-opacity-80 rounded-2xl py-2 px-4 text-white font-bold">
                                <div>Итого</div>
                                <div>{discount}</div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-6 mb-8">
                        <button onClick={goToNextStep} className={module.button}>перейти к оформлению</button>
                    </div>
                </div>
            </div>
            <div className="px-2">
                <div className="text-2xl font-bold">Рекомендуем</div>
                <div className="cards grid 2xl:grid-cols-6 xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-2 gap-4 mt-6 justify-center">
                    {doc.map((item) => (
                        <div key={item._id} className='mb-4'>
                            <Item item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default FirstStep;
