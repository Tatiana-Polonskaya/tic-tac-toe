import "./style.scss";

export default function ModalWindow() {
    return (
        <>
            <a href="#openModal">Открыть модальное окно</a>
            <div id="openModal" className="modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">Название</h3>
                            <a href="#close" title="Close" className="close">
                                ×
                            </a>
                        </div>
                        <div className="modal-body">
                            <p>Содержимое модального окна...</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
