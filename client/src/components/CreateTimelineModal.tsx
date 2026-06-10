import CreateTimelineForm from "./CreateTimelineForm";

interface Props {
  onClose: () => void;
}

export default function CreateTimelineModal({ onClose }: Props) {
  return (
    <>
      <style>{`
        .create-modal-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(15, 23, 42, 0.45);
          backdrop-filter: blur(6px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
        }

        .create-modal-wrap {
          width: 100%;
          max-width: 560px;
          max-height: 92vh;
          overflow-y: auto;
        }
      `}</style>

      <div className="create-modal-overlay" onClick={onClose}>
        <div
          className="create-modal-wrap"
          onClick={(e) => e.stopPropagation()}
        >
          <CreateTimelineForm onClose={onClose} />
        </div>
      </div>
    </>
  );
}