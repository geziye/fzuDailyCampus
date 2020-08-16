current_date=$(date  "+%Y_%m_%d")
log_name="${current_date}.log"
if [ ! -f "/usr/include/campus_daily/log/$log_name" ]; then
        touch /usr/include/campus_daily/log/$log_name
fi
current_time=$(date  "+%Y_%m_%d_%H_%M_%S")
echo $current_time >> /usr/include/campus_daily/log/$log_name
ts-node --compiler typescript --project /usr/include/campus_daily/tsconfig.json  /usr/include/campus_daily/src/index.ts >> /usr/include/campus_daily/log/$log_name
echo -e >> /usr/include/campus_daily/log/$log_name