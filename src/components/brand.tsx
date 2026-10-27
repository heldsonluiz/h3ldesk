import Link from "next/link";
export function Brand() {
  return (
    <Link href="/" className="brand" aria-label="H3LDesk, início">
      <span className="brand-symbol" aria-hidden="true">
        h<span>3</span>
      </span>
      <span>
        H3L<span className="orange">Desk</span>
      </span>
    </Link>
  );
}
