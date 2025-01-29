import { CartFooter } from "@/components/layout/cart-footer/cart-footer";
import { CartList } from "@/components/sections/cart-list/cart-list";
import clsx from "clsx";
import styles from './page.module.css'

export default function Cart() {
  return (
    <div className={clsx("layoutPage container", styles.container)}>
    <CartList />
    <CartFooter/>
    </div>
  ) 
}
